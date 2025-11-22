import React, { useState } from "react";
import { Card, Input, Button, Typography, Space, Alert, Spin, Divider } from "antd";
import { SendOutlined, ThunderboltOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

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
      // Simulate AI processing with different transformations
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
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2}>
        <ThunderboltOutlined /> AI Text Processing Demo
      </Title>
      <Paragraph>
        Enter your text below and click "Process with AI" to analyze it. This demo showcases
        text analysis including word count, sentiment analysis, and automatic summarization.
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Input Section */}
        <Card title="📝 Input Text" bordered={true}>
          <TextArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here... (e.g., 'This is a great product! I love how it works. The features are amazing and the quality is excellent.')"
            autoSize={{ minRows: 6, maxRows: 12 }}
            style={{ fontSize: "16px" }}
          />
          <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleProcess}
              loading={processing}
              size="large"
            >
              Process with AI
            </Button>
            <Button onClick={handleClear} size="large">
              Clear
            </Button>
          </div>
        </Card>

        {/* Processing Indicator */}
        {processing && (
          <Card>
            <div style={{ textAlign: "center", padding: "24px" }}>
              <Spin size="large" />
              <div style={{ marginTop: "16px" }}>
                <Text>🤖 AI is analyzing your text...</Text>
              </div>
            </div>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError("")}
          />
        )}

        {/* Output Section */}
        {output && !processing && (
          <Card title="✨ AI Processing Results" bordered={true}>
            <div style={{ whiteSpace: "pre-line", fontSize: "16px", lineHeight: "1.8" }}>
              {output}
            </div>
          </Card>
        )}

        {/* Information Section */}
        <Divider />
        <Card title="ℹ️ About This Demo" bordered={true}>
          <Paragraph>
            This demonstration showcases a simple AI text processing workflow:
          </Paragraph>
          <ul>
            <li><strong>Input Stage:</strong> User enters text for analysis</li>
            <li><strong>Processing Stage:</strong> AI analyzes the text (word count, sentiment, summary)</li>
            <li><strong>Output Stage:</strong> Results are displayed with formatting</li>
          </ul>
          <Paragraph>
            In a production environment, this could connect to real AI services like OpenAI GPT,
            Anthropic Claude, or custom models for more advanced processing capabilities.
          </Paragraph>
        </Card>
      </Space>
    </div>
  );
};
