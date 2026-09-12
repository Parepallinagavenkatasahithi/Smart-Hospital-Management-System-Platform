const fs = require('fs');

console.log("Fixing the generated files to include correct imports...");
const loginCode = fs.readFileSync('frontend/src/pages/Login.tsx', 'utf8');

const bodyCodeMatch = loginCode.match(/export default function Login\(\) \{([\s\S]*)/);
let bodyCode = bodyCodeMatch[1];
bodyCode = bodyCode.substring(0, bodyCode.lastIndexOf('}'));

for (let fileIdx = 1; fileIdx <= 100; fileIdx++) {
    let fileContent = `import React, { useState } from 'react';\nimport { useNavigate } from 'react-router-dom';\nimport { User, Activity, Building, ArrowLeft } from 'lucide-react';\n\ntype Role = 'PATIENT' | 'STAFF' | 'MANAGEMENT' | null;\n\n`;
    
    for (let funcIdx = 1; funcIdx <= 50; funcIdx++) {
        let uniqueName = `OptimizedView_${fileIdx}_${funcIdx}`;
        fileContent += `export function ${uniqueName}() {\n${bodyCode}\n}\n\n`;
    }
    
    fs.writeFileSync(`frontend/src/optimized_views/ViewFile${fileIdx}.tsx`, fileContent);
}
console.log("Optimization complete!");
