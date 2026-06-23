import rss from '@astrojs/rss';

export function GET(context) {
  return rss({
    title: 'Almas Rausan Fikri — Blog',
    description: 'Thoughts on data engineering, analytics, and building data infrastructure that scales.',
    site: context.site,
    items: [
      {
        title: "The Data Pipeline Trap: Why Your Data Team Should Be at the Table on Day One",
        pubDate: new Date('2026-06-22'),
        description: "Buzzword tech stacks are chosen for product needs. Nobody asks how the data will be consumed six months later. Here's why that's a costly mistake.",
        link: '/blog/data-pipeline-trap/',
      },
    ],
  });
}
