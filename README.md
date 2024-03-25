# Recruiter Expert

Recruiter Expert is an all-in-one platform designed for job seekers and recruiters alike. With its intuitive user interface and advanced features, the web application streamlines the hiring process for organizations.

## Technologies Used

- React
- Firebase
- HTML
- CSS
- Material UI

## User Types

Recruiter Expert caters to three main user types:

1. **Admin**
2. **Client**
3. **End User**

### Admin

The admin plays a pivotal role in managing the platform but first they have to generate the organization id using the organizationgenerator form.. Key functionalities include:

- Creating, editing, or deleting job postings.
- Accepting requests from recruiters within the organization to assist in the hiring process.
- Managing accepted recruiters/clients by:
  - Deactivating accounts (recruiters can log in but can't perform any actions).
  - Deleting accounts entirely.
- Assigning recruiters to specific jobs with one of the following permissions:
  - **Approved Permission**: Verify resumes of job applicants.
  - **Reviewed Permission**: Match resumes with job descriptions.
  - **Comment Permission**: Reject resumes and provide feedback for improvement.

### Recruiter/Client

Recruiters or clients affiliated with the organization have the following responsibilities:

- Signing up using the organization ID provided by the admin.
- Upon admin approval, performing actions based on the assigned permission.
- Utilizing the client portal to review resumes and take necessary actions.

### End User

End users, or job seekers, interact with the platform as follows:

- Signing up and uploading resumes.
- Selecting the desired resume for applications.
- Using the end user portal to apply for jobs and track application statuses:
  - **Pending**: Application submitted; no action taken by the recruiter.
  - **Approved**: Resume verified.
  - **Reviewed**: Shortlisted for further stages; awaiting recruiter contact.
  - **Rejected**: Resume rejected; optional feedback available for improvement.

## Getting Started

To get started with Recruiter Expert, follow these steps:

1. Sign up for an account based on your user type.
2. Complete the necessary profile information.
3. Explore available job postings or create new ones (for admins).
4. Review and take actions on resumes as per your assigned permissions.

## Contribution

Contributions to Recruiter Expert are welcome! Please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to contribute, provide feedback, or report any issues you encounter. Happy hiring! 🚀
