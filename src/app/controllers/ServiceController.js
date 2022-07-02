import FilterParser from '../services/FilterParser';
import * as Yup from 'yup';
import Store from '../models/store';
import Image from '../models/image';
import Service from '../models/service';

class ServiceController{
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().notRequired(),
      price:Yup.number().required(),
      image: Yup.object().shape({
        data: Yup.string().notRequired(),
      }),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json({ message: e.errors[0] });
    }

    const {name,description,image,price} = req.body;

    var includes = [];

    if (image) {
      includes.push(Image);
    }

    var service = await Service.create({
      name,
      description,
      image,
      price
    },{include:includes});

    service = await Store.findByPk(service.id);

    return res.status(200).json(service);
  }

  async destroy(req, res) {
    const id = req.params.pet_id;

    var service = await Service.findByPk(id);

    if (!service) {
      return res
        .status(404)
        .json({ message: 'sem serviços' });
    }

    await service.destroy();

    return res.status(200).json({ message: 'serviço deletado' });
  }
}

export default new ServiceController();