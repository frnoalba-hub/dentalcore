import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized - Admin only' }, { status: 403 });
        }

        const { filePath } = await req.json();

        if (!filePath || typeof filePath !== 'string' || filePath.includes('..')) {
            return Response.json({ error: 'A valid filePath is required' }, { status: 400 });
        }

        const token = Deno.env.get("GITHUB_TOKEN");
        if (!token) {
            return Response.json({ error: 'GitHub token not configured' }, { status: 500 });
        }

        const owner = 'frnoalba-hub';
        const repo = 'dentalcore';
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3.raw',
                'User-Agent': 'DentalCore-App'
            }
        });

        if (!response.ok) {
            return Response.json({ 
                error: `GitHub API error: ${response.statusText}` 
            }, { status: response.status });
        }

        const content = await response.text();

        return Response.json({ content, filePath });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});