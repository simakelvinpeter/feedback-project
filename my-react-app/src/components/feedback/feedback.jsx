import React, { useState } from "react";
import { Button, TextField, Box, FormHelperText, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Correct import
import "./feedback.scss";

const Feedback = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isHelpful, setIsHelpful] = useState(null);
  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);

  // Array of the 5 WhatsApp-like emojis
  const emojis = [
    { emoji: "😢", label: "Crying" },
    { emoji: "🙁", label: "Slightly Sad" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🙂", label: "Slightly Happy" },
    { emoji: "😄", label: "Very Happy" },
  ];

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleHelpfulClick = (value) => {
    setIsHelpful(value);
  };

  const handleSendFeedback = () => {
    if (selectedEmoji && feedbackText) {
      console.log("Feedback Sent:", {
        emoji: selectedEmoji,
        feedback: feedbackText,
        isHelpful: isHelpful,
      });
      alert("Thank you for your feedback!");
      resetForm();
      setFormSubmitAttempted(false);
    } else {
      setFormSubmitAttempted(true);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setSelectedEmoji(null);
    setFeedbackText("");
    setIsHelpful(null);
    setFormSubmitAttempted(false);
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleClose = () => {
    // Handle close action (e.g., close the feedback form)
    alert("Feedback form closed.");
    resetForm();
  };

  return (
    <div className="feedback-container">
      {/* Close button (X) in the top-right corner */}
      <IconButton className="close-button" onClick={handleClose}>
        <CloseIcon />
      </IconButton>

      <h1>Give Feedback</h1>
      <p className="feedback-subtitle">What do you think of the editing tool?</p>

      <Box mb={2}>
        <div className="emoji-container">
          {/* Custom Emoji Picker with only the 5 WhatsApp-like emojis */}
          {emojis.map((item, index) => (
            <span
              key={index}
              className={`emoji ${selectedEmoji === item.emoji ? "selected" : ""}`}
              onClick={() => handleEmojiClick(item.emoji)}
              title={item.label} // Show label on hover
            >
              {item.emoji}
            </span>
          ))}
        </div>
        {formSubmitAttempted && !selectedEmoji && (
          <FormHelperText error>Please select an emoji</FormHelperText>
        )}
      </Box>

      <p className="feedback-prompt">Do you have any thoughts you'd like to share?</p>

      <Box mb={2}>
        <TextField
          label="Your feedback"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={feedbackText}
          onChange={handleFeedbackChange}
          className="feedback-input"
          error={formSubmitAttempted && !feedbackText}
          helperText={formSubmitAttempted && !feedbackText ? "Please enter your feedback" : ""}
          required
        />
      </Box>

      <p className="follow-up-prompt">May we follow you up on your feedback?</p>

      <div className="radio-buttons">
        <label className="radio-button">
          <input
            type="radio"
            name="follow-up"
            value="yes"
            checked={isHelpful === true}
            onChange={() => handleHelpfulClick(true)}
          />
          <span className="radio-circle"></span>
          Yes
        </label>
        <label className="radio-button">
          <input
            type="radio"
            name="follow-up"
            value="no"
            checked={isHelpful === false}
            onChange={() => handleHelpfulClick(false)}
          />
          <span className="radio-circle"></span>
          No
        </label>
      </div>

      <Box mt={2}>
        <div className="action-buttons">
          <Button variant="contained" color="primary" onClick={handleSendFeedback}>
            Send Feedback
          </Button>
          <Button variant="contained" color="primary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
        {formSubmitAttempted && (!selectedEmoji || !feedbackText) && (
          <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
            Please complete all required fields
          </FormHelperText>
        )}
      </Box>
    </div>
  );
};

export default Feedback;