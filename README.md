# money-transfer-dashboard

Link to website: https://rbantug.github.io/vue3-dashboard/

Status: Online

Design was based on https://dribbble.com/shots/17336765-Money-Transfer-Ofspace-Dark

This project was initially made to serve as a way to practice the use of TailwindCSS. It was supposed to be a simple dashboard with no functionality whatsoever. But I eventually added a dynamic chart, a notification functionality that shows a toast whenever there are changes in the user's invoices or subscriptions and a focus on user accessibility (a11y). There is no backend, which means that all data will be stored in Pinia and any semblance of asynchronous code is just a combination of setTimeout and setInterval doing their thing. 

## Tech Used

* Vue 3 + Vite
* Pinia
* TailwindCSS
* HeadlessUI
* Iconify
* Vue/ChartJS

## What I learned from this project

After the code snowballed, I wish added some unit and e2e testing. It was cumbersome to constantly check everything in the dashboard after I added some new functionality. So in my next project, I would learn CI/CD and use Github actions.

I also found out that I can work more efficiently if I have a to-do list of bugs to fix or things to add. So searched for solutions and I found Jira. Apparently, teams use Jira for project management. I'll learn more about that and use it in my next project.

Lastly, making accessibility work on different screen readers and browsers is frustrating. It also adds a big chunk of code to an already long codebase. But despite that, I'll keep on implementing a11y. It's a pain but it has to be done.
