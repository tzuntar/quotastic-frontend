<p align="center">
  <a href="" rel="noopener">
  <img width="200px" alt="Quotastic Logo" src="https://github.com/tzuntar/quotastic-backend/assets/35228139/f2f365d5-1fba-49cd-a656-c030a781a2db" />
</p>

<h3 align="center">SkillUp Mentor • Quotastic [Front-End]</h3>

---

This repository contains the code for the back-end to the web app Quotastic,
made as a project for the [SkillUp Mentor Bootcamp](https://skillupmentor.com/).

Quotastic is an application that lets users post their favorite quotes, read quotes posted by others,
and vote on them.

<img width="1323" alt="D5" src="https://github.com/tzuntar/quotastic-frontend/assets/35228139/2aac1c9e-a6c3-423d-8bdf-5eed35f18727">

The back-end part of the project is in the [tzuntar/quotastic-backend](https://github.com/tzuntar/quotastic-backend) repository.

---

## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Deployment](#deployment)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the Quotastic front-end up and running on your local machine for development and testing
purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### ✅ Prerequisites <a name = "prerequisites"></a>

- Node.js and Yarn
- Up and running [back-end](https://github.com/tzuntar/quotastic-backend)

### ⏳Installing

1. Install all required dependencies by running `yarn install`
2. Set the following environmental variables:
   - `API_URL`: full URL to the back-end (ex. `https://localhost:8000`)
4. Run the development server using `npm start` / `yarn start`

## 🚀 Deployment <a name = "deployment"></a>

Run `yarn build` to create an optimized production version. Make sure to configure the env. variables on
the server as well.
