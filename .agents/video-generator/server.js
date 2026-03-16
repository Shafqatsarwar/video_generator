
const express = require('express');
const cors = require('cors');
const { VideoGeneratorAgent } = require('./index');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from output directory
app.use('/outputs', express.static(path.join(process.cwd(), 'output')));

const agent = new VideoGeneratorAgent();

app.post('/api/generate', async (req, res) => {
  const specification = req.body;
  
  // Use new validation logic
  const validation = agent.validateParameters(specification);
  if (!validation.valid) {
    return res.status(400).json({ success: false, error: validation.errors.join(', ') });
  }

  console.log(`[API] Received generation request for: ${specification.title}`);

  try {
    const result = await agent.generateDemoVideo(specification);
    const fileName = path.basename(result.outputPath);
    const publicUrl = `http://localhost:${port}/outputs/${fileName}`;
    
    res.json({ 
      success: true, 
      outputPath: result.outputPath, 
      url: publicUrl,
      fileName,
      assessment: result.assessment,
      executionTime: result.executionTime
    });
  } catch (error) {
    console.error(`[API] Generation failed: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', system: 'Excellence Links Video Engine' });
});

app.listen(port, () => {
  console.log(`============================================================`);
  console.log(`Video Generation API running at http://localhost:${port}`);
  console.log(`Endpoint: POST http://localhost:${port}/api/generate`);
  console.log(`============================================================`);
});
