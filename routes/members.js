const express = require("express");
const router = express.Router();
const Member = require("../models/member");

// Getting all members
router.get("/", async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message }); // Status code 500 = something is wrong on our end, not the user      
    }
});

// Getting one member
router.get("/:id", getMember, (req, res) => {
    res.json(res.member);
});


// Creating one member
router.post("/", async (req, res) => {
    const member = new Member({
        name: req.body.name,
        memberInOrg: req.body.memberInOrg
    });
    try {
        const newMember = await member.save();
        res.status(201).json(newMember); // Status code 201 = a resource has successfully been created
    } catch (error) {
        res.status(400).json({ message: error.message }) // Status code 400 = something is wrong with the user input
    }
});


// Updating one member
router.patch("/:id", getMember, async (req, res) => {
    if (req.body.name != null) {
        res.member.name = req.body.name;
    }
    if (req.body.memberInOrg != null) {
        res.member.memberInOrg = req.body.memberInOrg;
    }
    try {
        const updatedMember = await res.member.save();
        res.json(updatedMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Delete one member
router.delete("/:id", getMember, async (req, res) => {
    try {
        await res.member.remove();
        res.json({ message: "Member deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

async function getMember(req, res, next) {
    let member;
    try {
        member = await Member.findById(req.params.id);
        if (member == null) {
            return res.status(404).json({ message: "Member does not exist" }); // Status code 404 = can't find 
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.member = member;
    next();
}

module.exports = router;