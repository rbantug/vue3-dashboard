# money-transfer-dashboard

Link to website: https://rbantug.github.io/vue3-dashboard/

Status: Online

Design was based on https://dribbble.com/shots/17336765-Money-Transfer-Ofspace-Dark

This project was initially made to serve as a way to practice the use of TailwindCSS. It was supposed to be a simple dashboard with no functionality whatsoever. But I eventually added a dynamic chart, a notification functionality that shows a toast whenever there are changes in the user's invoices or subscriptions and a focus on user accessibility (a11y). There is no backend, which means that all data will be stored in Pinia and any semblance of asynchronous code is just a combination of setTimeout and setInterval doing their thing. 

Also, it is NOT responsive. And the (terrible) designs for the invoice, subscription and transaction modals were made by me. It would have been better if I had a design from Figma that shows the entire dashboard.  

## Tech Used

* Vue 3 + Vite
* Pinia
* TailwindCSS
* HeadlessUI
* Iconify
* Vue/ChartJS

## What I learned from this project

After the code snowballed, I wish I included some unit and e2e testing. It was cumbersome to constantly check everything in the dashboard after I added a new functionality. So in my next project, I would learn CI/CD and use Github actions.

I also found out that I can work more efficiently if I have a to-do list of bugs to fix or things to add. So searched for solutions and I found Jira. Apparently, teams use Jira for project management. I'll learn more about that and use it in my next project.

Lastly, making accessibility work on different screen readers and browsers is frustrating. It also adds a big chunk of code to an already long codebase. But despite that, I'll keep on implementing a11y. It's a pain but it has to be done.

## Screenshots

![Landing Page](https://drive.google.com/uc?id=1R5H6akj1BFms7qU_8VgsxhVqXlWTW_bX)

### Chart

![Chart](https://drive.google.com/uc?id=1U2_HYXwPSIE5AU-l1Gv9iCVxW2tl5uRR)

### Transaction modal

![Transaction Modal](https://drive.google.com/uc?id=1c2kfHZrePAs-UI5lJwtnSl8fwVdSNkEK)

### Adding a new invoice

![Adding a new invoice](https://drive.google.com/uc?id=1Ea-bS_L3T1Zte5pbAmoLoYRaszW3bbjq)

### All invoice modal

![All invoice modal](https://drive.google.com/uc?id=11PDF6gM1misS3Wj52sJxN4ejQwIG_Ltg)

### Invoice notification

![Invoice notification](https://drive.google.com/uc?id=1ilZZA-ycCUkVlkPoXTjVuscxbTUIq8Un)

### List of subscriptions

![list of subscriptions](https://drive.google.com/uc?id=11P0rXmfxebyick1yy5qBh9xm-DO-611E)

### New subscription options

![New subscription options](https://drive.google.com/uc?id=1VqIHD55NOvqAJcP1-KqZJgqVTsRYq4IK)

### New subscription summary

![New subscription options](https://drive.google.com/uc?id=1jN7N8XkXfp0xJhN1S8hxLwfpiS4VZ3Mw)

### Processing the new subscription

![Processing the new subscription](https://drive.google.com/uc?id=1XCP1XyKgSSBC5HZGbGVcbVVMSRa7Q3pd)
