import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import { Send as SendIcon, Bolt as BoltIcon } from "@mui/icons-material";

export const AiDemo: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleProcess = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to process");
      return;
    }

    setProcessing(true);
    setError("");
    setOutput("");

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo transformations
      const wordCount = inputText.trim().split(/\s+/).length;
      const charCount = inputText.length;
      const sentences = inputText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
      const sentenceCount = sentences.length;

      // Simple sentiment analysis simulation
      const positiveWords = ["good", "great", "excellent", "amazing", "wonderful", "happy", "love"];
      const negativeWords = ["bad", "terrible", "awful", "sad", "hate", "angry", "poor"];

      const lowerText = inputText.toLowerCase();
      const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
      const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

      let sentiment = "neutral";
      if (positiveCount > negativeCount) sentiment = "positive ✅";
      else if (negativeCount > positiveCount) sentiment = "negative ⚠️";

      // Generate summary
      const firstSentence = sentences[0]?.trim() || "";
      const summary = firstSentence.length > 100
        ? firstSentence.substring(0, 100) + "..."
        : firstSentence;

      const result = `
📊 Text Analysis Results:

📝 Statistics:
• Words: ${wordCount}
• Characters: ${charCount}
• Sentences: ${sentenceCount}
• Average words per sentence: ${sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0}

🎭 Sentiment Analysis:
• Overall sentiment: ${sentiment}
• Positive indicators: ${positiveCount}
• Negative indicators: ${negativeCount}

📋 Summary:
${summary || "No content to summarize"}

✨ AI Processing completed successfully!
      `;

      setOutput(result.trim());
    } catch (err) {
      setError("An error occurred during processing. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutput("");
    setError("");
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        <BoltIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        AI Text Processing Demo
      </Typography>
      <Typography variant="body1" paragraph>
        Enter your text below and click "Process with AI" to analyze it. This demo showcases
        text analysis including word count, sentiment analysis, and automatic summarization.
      </Typography>

      <Stack spacing={3}>
        {/* Input Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📝 Input Text
            </Typography>
            <TextField
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here... (e.g., 'This is a great product! I love how it works. The features are amazing and the quality is excellent.')"
              multiline
              rows={6}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleProcess}
                disabled={processing}
                size="large"
              >
                {processing ? "Processing..." : "Process with AI"}
              </Button>
              <Button onClick={handleClear} size="large" variant="outlined">
                Clear
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Processing Indicator */}
        {processing && (
          <Card>
            <CardContent>
              <Box sx={{ textAlign: "center", py: 3 }}>
                <CircularProgress size={60} />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  🤖 AI is analyzing your text...
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {/* Output Section */}
        {output && !processing && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ✨ AI Processing Results
              </Typography>
              <Typography
                component="pre"
                sx={{
                  whiteSpace: "pre-line",
                  fontSize: "16px",
                  lineHeight: 1.8,
                  fontFamily: "inherit",
                }}
              >
                {output}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Information Section */}
        <Divider />
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ℹ️ About This Demo
            </Typography>
            <Typography variant="body1" paragraph>
              This demonstration showcases a simple AI text processing workflow:
            </Typography>
            <ul>
              <li><strong>Input Stage:</strong> User enters text for analysis</li>
              <li><strong>Processing Stage:</strong> AI analyzes the text (word count, sentiment, summary)</li>
              <li><strong>Output Stage:</strong> Results are displayed with formatting</li>
            </ul>
            <Typography variant="body1">
              In a production environment, this could connect to real AI services like OpenAI GPT,
              Anthropic Claude, or custom models for more advanced processing capabilities.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};
