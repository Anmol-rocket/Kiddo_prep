// Question data for DSSSB Practise. Imported only by the exam / result / review
// routes so the dashboard and landing page stay light.

import paper1Raw from "./dsssb/paper1.json"
import paper2Raw from "./dsssb/paper2.json"
import paper3Raw from "./dsssb/paper3.json"
import paper4Raw from "./dsssb/paper4.json"
import paper5Raw from "./dsssb/paper5.json"
import paper6Raw from "./dsssb/paper6.json"
import paper7Raw from "./dsssb/paper7.json"
import type { DsssbPaper } from "./dsssb-papers"

const papers: DsssbPaper[] = [
  paper1Raw as unknown as DsssbPaper,
  paper2Raw as unknown as DsssbPaper,
  paper3Raw as unknown as DsssbPaper,
  paper4Raw as unknown as DsssbPaper,
  paper5Raw as unknown as DsssbPaper,
  paper6Raw as unknown as DsssbPaper,
  paper7Raw as unknown as DsssbPaper,
]

export function getDsssbPaper(id: number): DsssbPaper | undefined {
  return papers.find((p) => p.id === id)
}

export function getAllDsssbPapers(): DsssbPaper[] {
  return papers
}
