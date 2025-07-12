import nodemailer from "nodemailer";
import { Team } from "../models/team.model.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { writeToPath } from "fast-csv";

export const sendProjectAssignmentEmail = async (projectName, teamLeaderId, responsiblePersons) => {
  try {
    if (!Array.isArray(responsiblePersons)) {
      throw new Error("responsiblePersons must be an array");
    }

    const leaderIdStr = teamLeaderId.toString();
    const filteredIds = responsiblePersons
      .map(id => id.toString())
      .filter(id => id !== leaderIdStr);

    const validIds = filteredIds.map(id => new mongoose.Types.ObjectId(id));

    // Fetch team leader
    const teamLeader = await Team.findById(teamLeaderId);
    if (!teamLeader || teamLeader.designation !== "Team Lead") {
      throw new Error("Invalid team leader or designation mismatch.");
    }

    // Get non-Team Lead members to notify
    const membersToNotify = await Team.find({ 
      _id: { $in: validIds }, 
      designation: { $ne: "Team Lead" } 
    });

    // Generate CSV file with responsible persons’ info
    const fileName = `responsible-persons-${projectName.replace(/\s+/g, "_")}-${Date.now()}.csv`;
    const filePath = path.join("temp", fileName);
    fs.mkdirSync("temp", { recursive: true });

    const csvStream = writeToPath(filePath, membersToNotify.map(member => ({
      Name: member.name,
      Email: member.email,
      Phone: member.phone
    })), { headers: true });

    await new Promise((resolve, reject) => {
      csvStream.on("finish", resolve);
      csvStream.on("error", reject);
    });

    // Setup transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to team leader with CSV
    const leaderMailOptions = {
      from: `"Project Manager" <${process.env.EMAIL_USER}>`,
      to: teamLeader.email,
      subject: `Team Lead Assignment: ${projectName}`,
      html: `
        <p>Hi ${teamLeader.name},</p>
        <p>You have been assigned as the <strong>Team Lead</strong> for the project: <strong>${projectName}</strong>.</p>
        <p>Please coordinate with your team to ensure successful delivery.</p>
        <p>Attached is a CSV file listing the responsible team members.</p>
        <p>Best regards,<br/>Project Management Team</p>
      `,
      attachments: [
        {
          filename: "Responsible-Persons.csv",
          path: filePath,
        },
      ],
    };

    await transporter.sendMail(leaderMailOptions);

    // Clean up CSV temp file
    fs.unlink(filePath, err => {
      if (err) console.warn("Temp file cleanup failed:", err.message);
    });

    // Optionally send individual emails to members
    for (const member of membersToNotify) {
      const mailOptions = {
        from: `"Project Manager" <${process.env.EMAIL_USER}>`,
        to: member.email,
        subject: `Team Lead Details for Project: ${projectName}`,
        html: `
          <p>Hi ${member.name},</p>
          <p>You have been assigned to the project: <strong>${projectName}</strong>.</p>
          <p>Your team leader for this project is:</p>
          <ul>
            <li><strong>Name:</strong> ${teamLeader.name}</li>
            <li><strong>Email:</strong> ${teamLeader.email}</li>
            <li><strong>Phone:</strong> ${teamLeader.phone}</li>
          </ul>
          <p>Please reach out to your team lead for any coordination or support.</p>
          <p>Best regards,<br/>Project Management Team</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    console.log("✅ Emails with CSV sent to team leader and members.");
  } catch (error) {
    console.error("❌ Error sending project assignment emails:", error.message);
    throw error;
  }
};
