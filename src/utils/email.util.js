import nodemailer from "nodemailer";
import { Team } from "../models/team.model.js";
import mongoose from "mongoose";

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

    // Setup transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",       // Titan SMTP server
      port: 465,                           // SSL/TLS port
      secure: true,  
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Send email to the team leader
    const leaderMailOptions = {
      from: `"Project Manager" <${process.env.EMAIL_USER}>`,
      to: teamLeader.email,
      subject: `Team Lead Assignment: ${projectName}`,
      html: `
        <p>Hi ${teamLeader.name},</p>
        <p>You have been assigned as the <strong>Team Lead</strong> for the project: <strong>${projectName}</strong>.</p>
        <p>Please coordinate with your team to ensure successful delivery.</p>
        <p>Best regards,<br/>Project Management Team</p>
      `,
    };
    await transporter.sendMail(leaderMailOptions);

    // 2. Send email to each non-Team Lead member
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

    console.log("✅ Emails sent to team lead and team members.");
  } catch (error) {
    console.error("❌ Error notifying team members:", error.message);
    throw error;
  }
};
