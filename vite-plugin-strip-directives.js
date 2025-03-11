export default function stripDirectives() {
  return {
    name: 'strip-directives',
    transform(code) {
      // Remove "use client" and similar directives
      if (code.includes('"use client"') || code.includes("'use client'")) {
        return code.replace(/(['"])use client\1;?\s*/, '');
      }
      return code;
    }
  };
} 