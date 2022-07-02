import FilterParser from '../services/FilterParser';
import * as Yup from 'yup';
import Faq from '../models/faq';

class FaqController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().notRequired(),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ message: e.errors[0] });
    }

    const { title, description } = req.body;

    var faq = await Faq.create({
      title,
      description,
    });

    faq = await Faq.findByPk(faq.id);

    return res.status(200).json(faq);
  }

  async find(req, res) {
    const id = req.params.faq_id;

    let faq = await Faq.findOne({
      where: {
        id,
      },
    });

    if (!faq) {
      return res
        .status(404)
        .json({ message: 'Pergunta frequente não encontrada' });
    }

    return res.status(200).json(faq);
  }

  async index(req, res) {
    var limit = req.query.limit
      ? (limit = parseInt(req.query.limit))
      : undefined;

    var offset = req.query.offset
      ? (offset = parseInt(req.query.offset))
      : undefined;

    var order = undefined;
    if (req.query.order) {
      order = JSON.parse(req.query.order);
    }

    var where = {};
    if (req.query.filter) {
      where = JSON.parse(req.query.filter);
      where = FilterParser.replacer(where);
    }

    var faqs = await Faq.findAndCountAll({
      limit,
      offset,
      order,
      where,
      col: `${Faq.name}.id`,
      distinct: true,
      subQuery: false,
    });

    return res.status(200).json(faqs);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().notRequired(),
      description: Yup.string().notRequired(),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ message: e.errors[0] });
    }

    var faq = await Faq.findByPk(req.params.faq_id);

    if (!faq) {
      return res
        .status(404)
        .json({ message: 'Pergunta frequente não encontrado' });
    }

    const { title, description } = req.body;

    faq = await faq.update({
      title,
      description,
    });

    faq = await Faq.findByPk(faq.id);

    return res.status(200).json(faq);
  }

  async bulkDestroy(req, res) {
    const bulk = JSON.parse(req.query.bulk);

    var faqs = await Faq.findAll({ where: { id: bulk } });

    var successes = [];
    var errors = [];

    for (var i = 0; i < faqs.length; i++) {
      var faq = faqs[i];
      var messages = [];

      var data = {
        id: faq.id,
        name: faq.title,
        messages,
      };

      if (messages.length > 0) {
        errors.push(data);
      } else {
        successes.push(data);
      }
    }

    var ids = successes.map((e) => {
      return e.id;
    });

    // for (var i in ids) {
    //   var faq = await Faq.findByPk(ids[i]);
    //   await faq.update({
    //     deletedBy: req.user.id,
    //   });
    // }

    await Faq.destroy({ where: { id: ids } });

    return res.status(200).json({ errors, successes });
  }
}

export default new FaqController();
