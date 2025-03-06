# Project-3-Data-Viz
## Title : "Social Mobility Analysis"
### Overview 
- The project is about analyzing the data of different cities and neighborhoods using metrics like median rent, median household income, graduation rates, short work commute rates, and poverty rates to see how these metrics affect social mobility.
- "charts" folder contains visualization graphs w.r.t north, south, east, west sides of chicago and the suburbs.
- "cleaned_data" folder has the cleaned data that was used for the visualizations
- "raw_data" folder has the raw data we imported for this project from the opportunity atlas website.
- "static/js" has the main javascript file (app.js) used to create the dashboard of this project and "d.js" file as a json file for further data visualization. 
- "data_cleaning.ipynb" is the juypter notebook used to clean the data from the raw data
- "index.html" is the file used to launch the interactive dashboard.
- "heatmap_and_other_graphs.ipynb" is the juypter notebook used to group the chicago neighborhoods in the cardinal directions and the cities outside of chicago as suburbs. With this data we tested out a few graphs and we got our heatmap of how the factors correlate to one another.
- "How to plant a tree_  An Analysis of Social Mobility in Chicago Neighborhoods.pdf" file is the presentation file.

### Objective
- Create visualizations regarding the factors linked to social mobility which is as follows:

    1. The change in the rent across different neighborhoods within Chicago and the suburban cities on its outskirts.
    2. The effect of median household changes in the poverty rate.
    3. The interrelationship in between graduation rate, household income and the rent.
    
- Create a visualization which compares different metrics w.r.t different regions of chicago like south, north, east, west and suburbs.

### Instruction 
1. Once the file is imported you can go to the index.html file to get the dashboard
2. Once the dashboard is open on the left-hand side you can see the city or neighborhood dropdown.
3. You can choose any city or neighborhood from the dropdown menu to see the respective graphs.
- For each city three graphs are generated first bar graph followed by scatter plot and finally the bubble chart showing the relationship between the metrics of the city/neighborhood giving us an insight of their effect in social mobility
4. There is the fourth bar graph at the bottom of the dashboard where you can choose different metrics to see how it changes according to different regions within the chicago area and the surrounding suburban cities. 

### Considerations 
- We would like to inform the users that the data we used for this project development might not be very reliable due to the limited data used to produce the visualizations. Because of the insufficient data in the dataset we used, you may encounter some unusual graphs for certain cities or neighborhoods. We advise users of this project to consider these limitations while using it. There are other factors that could affect social mobility, which have not been covered in our project. We strongly encourage users to use this project only to observe basic relationships between the metrics and their effect on social mobility, and not to make any important decisions solely based on this project. Our aim is simply to provide a rough sketch of how these metrics affect social mobility.

### Data Source 
- ** https://www.opportunityatlas.org/ **

### Reference to basecode.
- ** https://git.bootcampcontent.com/Northwestern-University/NU-VIRT-DATA-PT-10-2024-U-LOLC/-/blob/main/02-Homework/14-Interactive-Visualizations/Starter_Code/static/js/app.js?ref_type=heads **

### Link To Dashboard
-** https://binodgaihre.github.io/Project-3-Data-Viz/ **

