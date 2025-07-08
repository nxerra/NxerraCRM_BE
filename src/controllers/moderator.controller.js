import {
  modifyModeratorAccessService,
  getAllMod,
} from "../services/moderator.service.js";

// ------------- to update access rights to moderator ---------------
// ....................................................
export const modifyModeratorAccess = async (req, res) => {
  try {
    const { moderatorId } = req.params;
    const { canAccess } = req.body;

    const updatedModerator = await modifyModeratorAccessService(
      moderatorId,
      canAccess
    );

    return res.status(200).json({
      message: "Moderator's access updated successfully",
      updatedModerator,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "Invalid canAccess array") {
        return res.status(400).json({ message: "Invalid canAccess array" });
      } else if (
        error.message === "Moderator not found or user is not a moderator"
      ) {
        return res
          .status(404)
          .json({ message: "Moderator not found or user is not a moderator" });
      } else {
        return res.status(500).json({ message: "Server error" });
      }
    } else {
      return res.status(500).json({ message: "Server error" });
    }
  }
};

// ------------- to get all moderators ---------------
// ....................................................
export const getAllModerators = async (req, res) => {
  try {
    const allMod = await getAllMod();
    return res.status(201).json(allMod);
  } catch (err) {
    return res.status(400).json({
      error: err instanceof Error ? err.message : "Error fetching moderators",
    });
  }
};
