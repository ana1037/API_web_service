import Patient from "../models/patient.js";
import express from "express";

const router = express.Router();

router.route("/patients")
  .post(async (req, res) => {
    try {
      const patient = Patient.build(req.body);
      await patient.save()

      res.status(201).json({ patient: patient.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const patient_records = await Patient.findAll();
      const patients = patient_records.map((patient) => patient.get({ plain: true }));

      res.json({ patients });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/patients/:id")
  .get(async (req, res) => {
    try {
      const patient = await Patient.findByPk(req.params.id);

      res.json({ patient: patient.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const patient = await Patient.findByPk(req.params.id);
      await patient.update(req.body)

      res.json({ patient: patient.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const patient = await Patient.findByPk(req.params.id);
      await patient.destroy();

      res.sendStatus(204);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })

export default router;

