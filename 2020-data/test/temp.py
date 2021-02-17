# -*- coding: utf-8 -*-
"""
Created on Sun Jan 31 16:58:56 2021

@author: jjj93
"""





import pandas
data = pandas.DataFrame({
    'c':['a','b'],
    'p':[0.1,0.2]
    })

data.plot.bar(
    x='c',
    y='p'
    )

