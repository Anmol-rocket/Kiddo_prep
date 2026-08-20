import json, random
import copy

print("Loading existing papers...")
try:
    p1 = json.load(open("lib/dsssb/paper1.json", encoding="utf-8"))
    p2 = json.load(open("lib/dsssb/paper2.json", encoding="utf-8"))
except Exception as e:
    print(f"Error loading papers: {e}")
    exit(1)

qs_by_sub = {}
for q in p1["questions"] + p2["questions"]:
    sub = q["subsectionId"]
    if sub not in qs_by_sub:
        qs_by_sub[sub] = []
    qs_by_sub[sub].append(q)

target_paper = copy.deepcopy(p1)
target_paper["id"] = 3
target_paper["name"] = "Practice Paper 3"
target_paper["code"] = "DSSSB/RAD/PP-03"
target_paper["questions"] = []

q_no = 1
for sub in target_paper["subsections"]:
    sub_id = sub["id"]
    pool = qs_by_sub.get(sub_id, [])
    # Duplicate the pool if we don't have enough, although we should have exactly 40 (20+20)
    random.shuffle(pool)
    selected = pool[:20]
    
    for q in selected:
        new_q = copy.deepcopy(q)
        new_q["id"] = f"p3_q{q_no}"
        new_q["no"] = q_no
        
        # Shuffle options
        opts_with_index = list(enumerate(new_q["options"]))
        ans_idx = new_q["correctAnswer"]
        random.shuffle(opts_with_index)
        
        new_opts = [opt for idx, opt in opts_with_index]
        new_ans = next(i for i, (idx, opt) in enumerate(opts_with_index) if idx == ans_idx)
        
        new_q["options"] = new_opts
        new_q["correctAnswer"] = new_ans
        
        target_paper["questions"].append(new_q)
        q_no += 1

try:
    with open("lib/dsssb/paper3.json", "w", encoding="utf-8") as f:
        json.dump(target_paper, f, indent=1)
    print("Generated paper3.json successfully!")
except Exception as e:
    print(f"Error writing paper3.json: {e}")
