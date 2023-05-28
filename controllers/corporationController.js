const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getAllCorporation = async (req, res) => {
    //console.log("getting all");
    const company =  await prisma.Corporation.findMany();
    if (!company) return res.status(204).json({ 'message': 'No company found.' });
    res.json(company);
}

const createnewCorporation = async (req, res) => {
        //console.log("craate new");

    if (!req?.body?.company_name || !req?.body?.company_title) {
        return res.status(400).json({ 'message': 'company_name and company_name are required' });
    }
    
    try {
        const is_company_in_DB = await prisma.Corporation.findFirst({
            where: {
                company_name: req.body.company_name
            }
        })
        if (is_company_in_DB) {
            return res.status(201).json({ 'message': 'company_name is already in DB' })

        } else {
            const result =await prisma.Corporation.create({

                data: {
                  company_name: req.body.company_name,
                  company_title: req.body.company_title,
                  company_address:req.body.company_address,
                  company_working_area :req.body.company_working_area,
                  company_phone_num :req.body.company_phone_num,
                  company_web_address :req.body.company_web_address,
                  company_fax_address :req.body.company_fax_address,
                  company_verify : false
                },
            
              });
              res.status(201).json(result);
        }
        
    } catch (err) {
        console.error(err);
    }
}

const deleteCorporation = async (req, res) => {
    //console.log("delete  corp");

    if (!req?.body?.company_name) return res.status(400).json({ 'message': 'company name required.' });
    const company = await prisma.Corporation.findFirst({
        where: {
          company_name: req.body.company_name,
        },
      })
    if (!company) {
        return res.status(400).json({ "message": `No company matches with this name ${req.params.company_name}.` });
    }
    const deleted_company =  await prisma.Corporation.delete({
        where: {
            id: company.id,
        },
      });
    res.json(deleted_company);
}

const getCorporation = async (req, res) => {
    //console.log("get specific corp ");

    if (!req?.body?.company_name) return res.status(400).json({ 'message': 'specific company name required.' });

    const company = await prisma.Corporation.findFirst({
        where: {
          company_name: req.body.company_name,
        },
      })
    if (!company) {
        return res.status(400).json({ "message": `No company matches with this name ${req.params.company_name}.` });
    }
    res.json(company);
}

const  updateCorporation= async (req, res) => {
    //console.log("update  corp");

    console.log(req?.body?.comp_name)
    if (!req?.body?.comp_name) return res.status(400).json({ 'message': 'company name required.' });
    const foundCompany =  await  prisma.Corporation.findFirst(
        {
            where: 
            { company_name:
            {
                    
                equals: req?.body?.comp_name

            },   
        },
        });

    if (!foundCompany) return res.status(400).json({ 'message': 'company couldnt find , please check company name and.' });

    const company = await  prisma.Corporation.update({
        where :{
           id : foundCompany.id
        },
        data:{
            company_verify: true
        }
    })
    
    if (!company) {
        return res.status(400).json({ "message": `No company matches with this name ${req.body.company_name}.` });
    }
    res.json(company);
}


module.exports = {
    getAllCorporation,
    createnewCorporation,
    deleteCorporation,
    getCorporation,
    updateCorporation
}