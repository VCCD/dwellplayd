# dwellplayd
dwellplayd is a react native app designed to gamify and incentivize completing communal tasks in a shared living space

![Task](https://i.imgur.com/udYPc0v.gif) ![Complete](https://i.imgur.com/SZ02dmH.gif) ![Scores Stats](https://i.imgur.com/O5x9sSG.gif)

# Description
As a player is logged in. User will be promted to create or join an exisiting dwelling. Dwellplayd will suggest a few popular tasks to choose from. There's also an option to create new tasks. Each tasks have a frequency selector for to determine how often a task needs to be completed, then activated to start. Points accumulate in value as time goes by. 

When a player completes a task, a camera will launch and they can provide photographic proof. After completion, points will be added to their monthly score. The scores page shows the scores for each player in the dwelling. On the scores page, one can double check the proof, which tasks have been completed by each player, as well as previous winners in previous months. The stats page can also provide further insights and visual information for each player's current score and previous scores as well as avg point value per task. 

# Scoring Model
A task’s frequency setting is generally a proxy for the effort required to complete it. Point value is proportional to the task’s specified frequency. Shortly after a task has been completed or first created, it’s point value should increase gradually to discourage users from completing it before truly necessary.

Surrounding it’s expected date of completion, a task’s point value should increase rapidly to encourage completing the task on time. Eventually, a task’s point value should taper off to dissuade neglecting tasks in an effort to generate more points.


# Authors
Chris Miller, Cody Fayolle, David Fudacz, & Vi Tran


# Tech Stack
React Native, Redux, Node.JS, Expo, D3, Victory.JS, Express.JS, Sequelize, PostgreSQL, Mocha, Chai, Google Cloud, Nodemailer
