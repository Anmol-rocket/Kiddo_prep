// Question data for DSSSB Practise. Imported only by the exam / result / review
// routes so the dashboard and landing page stay light.

import paper1Raw from "./dsssb/paper1.json"
import paper2Raw from "./dsssb/paper2.json"
import type { DsssbPaper } from "./dsssb-papers"

const papers: DsssbPaper[] = [
  paper1Raw as unknown as DsssbPaper,
  paper2Raw as unknown as DsssbPaper,
]

export function getDsssbPaper(id: number): DsssbPaper | undefined {
  return papers.find((p) => p.id === id)
}

export function getAllDsssbPapers(): DsssbPaper[] {
  return papers
}
