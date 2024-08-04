interface Employee {
    employeeId: string;
    name: string;
    image:string;
    designation: string;
    rating: number;
    experience: number;
    dateOfJoining: string; // Could also be Date type depending on your use case
    currentTeam: string;
    reportingManager: string;
    phoneNumber: string;
    emailAddress: string;
    joiningYear?:string
  }

  export default Employee