# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import altair as alt
import pandas as pd
from vega_datasets import data as vega_data

morse = pd.read_csv('https://raw.githubusercontent.com/jvelleu/649_final_project/7648fb227384b3dad2707efdf8fb960f502b52ad/morse_data.csv', encoding='utf-8')

mouseSelection=alt.selection_single(
    on="mouseover",
    nearest=True,
    empty='none'
)

opacityCondition=alt.condition(
    mouseSelection,
    alt.value(1.0),
    alt.value(0.6)
)

scatter1 = alt.Chart(morse, width=400, height=400).mark_point(filled=True).encode(
    alt.X("x", title="", axis=None),
    alt.Y("y",title="", axis=None),
    alt.Tooltip(
        ["char","code"],
        title=None
    ),
    alt.Size("components:O")
).add_selection(
    mouseSelection
).encode(
    opacity=opacityCondition
)

scatter2 = alt.Chart(morse, width=400, height=400).mark_point(filled=True).encode(
    alt.X("x", title="", axis=None),
    alt.Y("y",title="", axis=None),
    alt.Tooltip(
        ["char","code"],
        title=None
    ),
    alt.Color("type:N"),
).add_selection(
    mouseSelection
).encode(
    opacity=opacityCondition
)

scatter3 = alt.Chart(morse, width=400, height=400).mark_point(filled=True).encode(
    alt.X("x", title="", axis=None),
    alt.Y("y",title="", axis=None),
    alt.Tooltip(
        ["char","code"],
        title=None
    ),
    alt.Size("usage rate:Q"),
).add_selection(
    mouseSelection
).encode(
    opacity=opacityCondition
)

scatter4 = alt.Chart(morse, width=400, height=400).mark_point(filled=True).encode(
    alt.X("x", title="", axis=None),
    alt.Y("y",title="", axis=None),
    alt.Tooltip(
        ["char","code"],
        title=None
    ),
    alt.Color("%dashes:Q"),
).add_selection(
    mouseSelection
).encode(
    opacity=opacityCondition
)


group = (scatter2 | scatter1) & (scatter3 | scatter4)

group

group.save('vis3.html')