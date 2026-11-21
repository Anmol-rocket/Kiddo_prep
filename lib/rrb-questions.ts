// Question data for RRB Practise. Imported only by the exam / result / review
// routes so the dashboard and landing page stay light.

import paper1Raw from "./rrb/paper1.json"
import paper2Raw from "./rrb/paper2.json"
import paper3Raw from "./rrb/paper3.json"
import type { RrbPaper } from "./rrb-papers"

const papers: RrbPaper[] = [
  paper1Raw as unknown as RrbPaper,
  paper2Raw as unknown as RrbPaper,
  paper3Raw as unknown as RrbPaper,
]

export function getRrbPaper(id: number): RrbPaper | undefined {
  return papers.find((p) => p.id === id)
}

export function getAllRrbPapers(): RrbPaper[] {
  return papers
}
