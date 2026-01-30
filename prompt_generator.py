#script for randomization for list of 
import random

projects = ["angular", 'bom', 'calculator-file', 'calculator', 'canvas',
            'chart', 'color', 'dom','dom1', 
            'draw', 'esmodule', 'expression-editor', 'expressjs', 'fastify-react', 
            'fastify', 'flex', 'float', 'form', 'grid', 
            'jotai', 'less', 'lowdb', 'mobx', 'nextjs',
            'nosql', 'nuxt', 'parcel', 'prisma',
            'react-no-ts', 'react', 'redux', 'sass', 
            'selector', 'sequielize', 'styled-components', 'stylus', 'survey', 
            'svelte', 'svg-chart', 'svg-solar', 'svg', 'table', 
            'tailwind', 'threejs', 'typescript', 'unocss', 'vite',
            'vue', 'webpack', 'zustand']

res = []
for i in range(10):
    random_number = random.randint(0, len(projects)-1)
    res.append((projects[random_number], random.randint(0, 20)))

res.sort(key=lambda x: x[0])
for idx, (project, task) in enumerate(res):
    print(f"{idx+1} {project} # {task}")

#tasks
'''
1 fastify-react # 19
2 threejs # 4
3 grid # 8
4 grid # 13
5 selector # 11
6 calculator # 20
7 table # 17
8 sequielize # 18
9 demo # 16
10 chart # 12
'''