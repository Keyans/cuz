import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'node_modules/element-plus/es/utils/strings.mjs');
const newContent = `export { hyphenate as kebabCase , capitalize as capitalize$1 } from '@vue/shared';

const escapeStringRegexp = (string = "") => string.replace(/[|\\\\{}()[\\]^$+*?.]/g, "\\\\$&").replace(/-/g, "\\\\x2d");
const capitalize = (str) => capitalize$1(str);

export { capitalize, escapeStringRegexp };
//# sourceMappingURL=strings.mjs.map`;

try {
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('元素组件strings.mjs文件修改成功！');
  
  // 打印修改后的内容以供验证
  const updatedContent = fs.readFileSync(filePath, 'utf8');
  console.log('修改后的文件内容:');
  console.log(updatedContent);
} catch (error) {
  console.error('修改文件时出错:', error);
} 