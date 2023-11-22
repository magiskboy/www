import { program } from 'commander';
import slugify from 'slugify';
import * as fs from 'fs';
import * as path from 'path';
import type { Meta } from 'components/Post';

function generateNewPost(meta: Meta) {
  const slug = slugify(meta.title, { trim: true, lower: true });
  const now = new Date();
  const content = `
  ---
  title: ${meta.title}
  date: ${now.toISOString()} 
  published: ${meta.published?.toString()}
  score: ${meta.score}
  tags: ${meta.tags?.map(item => `- ${item}`).join('\n')}
  categories: ${meta.categories?.map(item => `- ${item}`).join('\n')}
  description: "${meta.description}"
  ---

  Content is in here
  `.trim();

  fs.writeFileSync(path.resolve(`contents/vi/posts/${slug}.mdx`), content);
  fs.writeFileSync(path.resolve(`contents/en/posts/${slug}.mdx`), content);
}

program.name('www')
  .description('Set of commands for writing posts')
  .version('1.0.0');

program
  .command('generate')
  .argument<string>('title', 'Title of post', value => value.toString())
  .option<string[]>('-t', '--tag', (value, prev) => [...prev, value.toString()], [])
  .option<string[]>('-c', '--category', (value, prev) => [...prev, value.toString()], [])
  .option<string>('-d', '--description', value => value.toString(), '')
  .option<boolean>('-p', '--published', value => ['true', '1', 'on'].includes(value), false)
  .option<number>('-s', '--score', value => parseInt(value), 0)
  .action((title, options) => {
    generateNewPost({
      title,
      ...options,
    });
    console.info(`Generated ${title}`);
  });

program.parse();
