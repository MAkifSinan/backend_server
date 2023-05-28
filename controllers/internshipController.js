const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getAllInternship = async (req, res) => {

  const interships =  await prisma.internship.findMany();
  if (!interships) return res.status(204).json({ 'message': 'No company found.' });
  res.json(interships);  

}

const createnewInternship = async (req, res) => {

    if (!req?.body?.user) return res.status(400).json({ "message": 'User name required' });
    if (!req?.body?.company_name) return res.status(400).json({ "message": 'company name required' });
    if (!req?.body?.int_start_date) return res.status(400).json({ "message": 'int_start_date required' });
    if (!req?.body?.int_end_date) return res.status(400).json({ "message": 'int_end_daterequired' });
    if (!req?.body?.int_days) return res.status(400).json({ "message": 'int_days required' });
    if (!req?.body?.int_type) return res.status(400).json({ "message": 'int_type required' });
    
    const foundUser = await  prisma.user.findFirst({where: { username: { equals: req?.body?.user,  },   },});
    if (!foundUser) return res.status(400).json({ 'message': 'No users found' });
    console.log("founduser: ",foundUser);
    const foundCompany = await prisma.corporation.findFirst({where: {company_name: req.body.company_name, },  });
    if (!foundCompany) return res.status(400).json({ 'message': 'No company  found' });
    if (!foundCompany.company_verify) return res.status(400).json({ 'message': 'No company is not verify ' });

    console.log("founduser: ",foundCompany)
    const result = await prisma.internship.findFirst({
      where: {
        AND: [
          {
            User_student_name: {
              equals: foundUser.username,
            },
          },
          {
            company_name: {
              equals: foundCompany.company_name,
            },
          },
          {
            Internship_start_date: { 
              equals: req.body.int_start_date,
            },
          },
          {
            Internship_end_date: {
              equals: req.body.int_end_date,
            },
          },
        ],
      },
    })
    //console.log(result)
    if (!result) {
      const created_internship =  await prisma.internship.create({
        data: {
          User_student_name  : foundUser.username,
          User_school_number: foundUser.school_number,
          company_name: foundCompany.company_name,
          company_title: foundCompany.company_title,
          company_address: foundCompany.company_address,
          company_working_area :foundCompany.company_working_area,
          company_phone_num :foundCompany.company_phone_num,
          company_fax_address :foundCompany.company_fax_address,
          company_web_address :foundCompany.company_web_address,
          company_verify : foundCompany.company_verify,
          Internship_start_date :req.body.int_start_date,
          Internship_end_date :req.body.int_end_date,
          Internship_period :req.body.int_days,
          Internship_type :req.body.int_type,
          Internship_verify : false,

        },
        
      });
  
      res.status(201).json(created_internship);

    }
    else {
      return res.status(400).json({ "message": 'Internship already exist' });
    }

    //console.log("found company : ",foundCompany);

}

const deleteInternship = async (req, res) => {
  
  if (!req?.body?.user || !req?.body?.company_name) return res.status(400).json({ 'message': 'company name and user name are required.' });
  const internship = await prisma.internship.findFirst({
      where: {
        AND: [
          {
            User_student_name: {
              equals: req?.body?.user,
            },
          },
          {
            company_name: {
              equals: req?.body?.company_name,
            },
          },
          {
            Internship_start_date: { 
              equals: req.body.int_start_date,
            },
          },
          {
            Internship_end_date: {
              equals: req.body.int_end_date,
            },
          },
        ]
      },
    })
  if (!internship) {
      return res.status(400).json({ "message": "No internship matches with this infos" });
  }


  const deleted_intersihp =  await prisma.internship.delete({
      where: {
          id: internship.id,
      },
    });
  res.json(deleted_intersihp);

}

const getInternshipbyStudentName = async (req, res) => {
  if (!req?.body?.user ) return res.status(400).json({ 'message': 'company name and user name are required.' });

  const foundUser = await  prisma.internship.findMany({where: { User_student_name: { equals: req?.body?.user,  },   },});
  if (!foundUser) return res.status(400).json({ 'message': 'No users found' });
  res.json(foundUser);
}
const getInternshipbyCompanyName = async (req, res) => {
  if (!req?.body?.company_name ) return res.status(400).json({ 'message': 'company name are required.' });

  const foundCompany = await  prisma.internship.findMany({where: { company_name: { equals: req?.body?.company_name,  },   },});
  if (!foundCompany) return res.status(400).json({ 'message': 'No users found' });
  res.json(foundCompany);
}

const updateInternship = async (req, res) => {
  if (!req?.body?.user) return res.status(400).json({ "message": 'User name required' });
  if (!req?.body?.company_name) return res.status(400).json({ "message": 'company name required' });
  if (!req?.body?.int_start_date) return res.status(400).json({ "message": 'int_start_date required' });
  if (!req?.body?.int_end_date) return res.status(400).json({ "message": 'int_end_date required' });
  if (!req?.body?.verify_days) return res.status(400).json({ "message": 'verify_days required' });

  const foundedInt = await prisma.internship.findFirst({
    where: {
      AND: [
        {
          User_student_name: {
            equals: req?.body?.user,
          },
        },
        {
          company_name: {
            equals: req?.body?.company_name,
          },
        },
        {
          Internship_start_date: { 
            equals: req.body.int_start_date,
          },
        },
        {
          Internship_end_date: {
            equals: req.body.int_end_date,
          },
        },
      ],
    },
  })

  console.log(foundedInt)

  const updatedInt = await  prisma.internship.update({
    where :{
       id : foundedInt.id
    },
    data:{
        Internship_verify: true,
        Internship_verifyDays: req?.body?.verify_days
    }

    
})
    res.json(updatedInt);
}

module.exports = {
    getAllInternship,
    createnewInternship,
    deleteInternship,
    updateInternship,
    getInternshipbyStudentName,
    getInternshipbyCompanyName
}