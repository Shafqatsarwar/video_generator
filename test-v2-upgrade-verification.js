const { createScript } = require('./.agents/video-generator/script-generator');

async function verifyUpgrade() {
    const specV2 = {
        version: '2.0',
        title: 'AgentFactory Part 3: Business Domain Agent Workflows',
        description: 'Announcing the definitive guide to enterprise AI agents',
        videoType: 'product-overview',
        story: {
            hook: "What if your business domain expertise could be instantly translated into production-ready AI agents?",
            problem: "Enterprise workflows are complex, and generic AI often fails to capture the nuances of CFO, Legal, and Supply Chain operations.",
            benefit: "AgentFactory Part 3 provides 16 chapters of validated workflows across 7 domains, reducing production time by 80%.",
            cta: "Visit agentfactory.panaversity.org to launch your first enterprise agent factory."
        },
        keyPoints: [
            'Focus on 16 enterprise chapters across 7 business domains',
            'Translate expertise into standardized SKILL.md libraries'
        ],
        duration: 90,
        targetAudience: 'Enterprise professionals'
    };

    try {
        const script = await createScript(specV2);

        console.log('Script Metadata:', JSON.stringify(script.metadata, null, 2));
        console.log('\nTiming Info:', JSON.stringify(script.timing, null, 2));

        console.log('\nVoiceover Excerpt:');
        console.log(script.voiceover.full.substring(0, 500) + '...');

        // Validations
        const hasProblem = script.structure.problem !== null;
        const hasBenefit = script.structure.benefit !== null;
        const hasHook = script.structure.introduction.hook === specV2.story.hook;

        console.log('\nValidations:');
        console.log(`- Problem Section: ${hasProblem ? '✅' : '❌'}`);
        console.log(`- Benefit Section: ${hasBenefit ? '✅' : '❌'}`);
        console.log(`- Custom Hook: ${hasHook ? '✅' : '❌'}`);

        if (hasProblem && hasBenefit && hasHook) {
            console.log('\n✅ V2.0 SCRIPT GENERATION VERIFIED');
        } else {
            console.log('\n❌ V2.0 SCRIPT GENERATION FAILED VALIDATION');
            process.exit(1);
        }
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verifyUpgrade();
