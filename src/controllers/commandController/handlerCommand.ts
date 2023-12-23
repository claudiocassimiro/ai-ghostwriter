import { Request, Response } from "express";
import { chatPrompt } from "../../prompts/chatPrompt";

const command = async (req: Request, res: Response) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ message: "The command should not be empty" });
  }

  try {
    const message = await chatPrompt(command);

    return res.status(200).json({ message });
  } catch (error) {
    console.error(error);
  }
};

const commandController = {
  command,
};

export default commandController;
