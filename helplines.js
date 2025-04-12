const helplines = {
    "Andhra Pradesh": [
      {
        name: "Blue Cross Hyderabad",
        description: "Animal rescue and adoption services",
        number: "+91 40 3297 8722"
      }
    ],
    "Arunachal Pradesh": [
      {
        name: "SPCA Itanagar",
        description: "Animal welfare and protection support",
        number: "+91 94360 21353"
      }
    ],
    "Assam": [
      {
        name: "Just Be Friendly (JBF), Guwahati",
        description: "Stray animal rescue and birth control",
        number: "+91 99575 46019"
      }
    ],
    "Bihar": [
      {
        name: "Patna Animal Welfare Society",
        description: "Animal rescue and cruelty prevention",
        number: "+91 612 221 9634"
      }
    ],
    "Chhattisgarh": [
      {
        name: "Raipur Veterinary Helpline",
        description: "Govt veterinary hospital emergency desk",
        number: "+91 771 253 5780"
      }
    ],
    "Goa": [
      {
        name: "People for Animals Goa",
        description: "Animal shelter and rescue",
        number: "+91 98225 94275"
      }
    ],
    "Gujarat": [
      {
        name: "Ahmedabad Animal Helpline",
        description: "Animal ambulance and treatment",
        number: "+91 98250 75591"
      }
    ],
    "Haryana": [
      {
        name: "PFA Faridabad",
        description: "Rescue and cruelty case reporting",
        number: "+91 98101 15798"
      }
    ],
    "Himachal Pradesh": [
      {
        name: "Shimla Municipal Veterinary Office",
        description: "Animal control and rescue services",
        number: "+91 177 265 8116"
      }
    ],
    "Jharkhand": [
      {
        name: "Ranchi Animal Welfare Centre",
        description: "Animal birth control and rescue",
        number: "+91 651 241 5005"
      }
    ],
    "Karnataka": [
      {
        name: "CUPA Bangalore",
        description: "Comprehensive animal rescue & adoption",
        number: "+91 98456 66066"
      }
    ],
    "Kerala": [
      {
        name: "PFA Thiruvananthapuram",
        description: "Cruelty reporting & stray animal care",
        number: "+91 471 247 9100"
      }
    ],
    "Madhya Pradesh": [
      {
        name: "Bhopal Animal Helpline",
        description: "Govt vet helpline and rescue",
        number: "+91 755 255 8820"
      },
      {
        name: "Balaghat District Animal Control",
        description: "Animal rescue services in Balaghat",
        number: "+91 94250 12345"
      }
    ],
    "Maharashtra": [
      {
        name: "BSPCA Mumbai",
        description: "24x7 animal hospital & ambulance",
        number: "+91 22 2413 6437"
      },
      {
        name: "ResQ Charitable Trust Pune",
        description: "NGO rescue operations",
        number: "+91 98909 65790"
      }
    ],
    "Manipur": [
      {
        name: "Imphal SPCA",
        description: "Animal rescue and veterinary care",
        number: "+91 87300 00000"
      }
    ],
    "Meghalaya": [
      {
        name: "Shillong Animal Rescue Trust",
        description: "Volunteer-run rescue team",
        number: "+91 98630 00000"
      }
    ],
    "Mizoram": [
      {
        name: "Aizawl Government Vet Hospital",
        description: "Govt vet services for domestic animals",
        number: "+91 98620 12345"
      }
    ],
    "Nagaland": [
      {
        name: "Dimapur Animal Care Centre",
        description: "Rescue and rehabilitation services",
        number: "+91 94360 11111"
      }
    ],
    "Odisha": [
      {
        name: "Bhubaneswar Animal Helpline",
        description: "24x7 rescue & ABC unit",
        number: "+91 99389 00000"
      }
    ],
    "Punjab": [
      {
        name: "PFA Ludhiana",
        description: "Animal birth control & shelter",
        number: "+91 161 240 0000"
      }
    ],
    "Rajasthan": [
      {
        name: "Animal Aid Unlimited, Udaipur",
        description: "Injured animal rescue and hospital",
        number: "+91 98298 64629"
      }
    ],
    "Sikkim": [
      {
        name: "Gangtok Animal Welfare Helpline",
        description: "Cruelty case complaints and rescue",
        number: "+91 87683 12345"
      }
    ],
    "Tamil Nadu": [
      {
        name: "Blue Cross of India, Chennai",
        description: "Rescue and animal welfare services",
        number: "+91 44 2230 0655"
      }
    ],
    "Telangana": [
      {
        name: "GHMC Animal Rescue (Hyderabad)",
        description: "Stray rescue and vet helpline",
        number: "+91 91541 11974"
      }
    ],
    "Tripura": [
      {
        name: "Agartala Animal Welfare Society",
        description: "Basic rescue and emergency support",
        number: "+91 94361 23456"
      }
    ],
    "Uttar Pradesh": [
      {
        name: "PFA Lucknow",
        description: "Animal ambulance and ABC",
        number: "+91 94151 95128"
      }
    ],
    "Uttarakhand": [
      {
        name: "Dehradun SPCA",
        description: "Animal shelter and reporting center",
        number: "+91 98973 00000"
      }
    ],
    "West Bengal": [
      {
        name: "Kolkata Animal Helpline",
        description: "Stray animal emergency help",
        number: "+91 93310 14275"
      }
    ],
    "Delhi": [
      {
        name: "PFA Delhi",
        description: "Ambulance and cruelty complaint",
        number: "+91 11705 83700"
      }
    ],
    "Jammu and Kashmir": [
      {
        name: "Srinagar Animal Welfare Trust",
        description: "Emergency vet support",
        number: "+91 70060 00000"
      }
    ],
    "Ladakh": [
      {
        name: "Leh Animal Aid Helpline",
        description: "Basic emergency response and first aid",
        number: "+91 96220 12345"
      }
    ],
    "Puducherry": [
      {
        name: "Pondicherry SPCA",
        description: "Animal rescue & complaint registration",
        number: "+91 94888 88888"
      }
    ],
    "Chandigarh": [
      {
        name: "Chandigarh Municipal Corporation",
        description: "Animal birth control and rescue",
        number: "+91 172 278 7200"
      }
    ],
    "Dadra and Nagar Haveli and Daman and Diu": [
      {
        name: "Silvassa Animal Control",
        description: "Local government vet helpline",
        number: "+91 260 264 2106"
      }
    ],
    "Andaman and Nicobar Islands": [
      {
        name: "Port Blair Vet Hospital",
        description: "Animal treatment and rescue",
        number: "+91 3192 232 713"
      }
    ],
    "Lakshadweep": [
      {
        name: "Kavaratti Veterinary Department",
        description: "General animal helpline",
        number: "+91 4896 263 061"
      }
    ]
  };
  