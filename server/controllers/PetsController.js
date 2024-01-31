import Pets from '../models/Pets.js';
import Specs from '../models/Specs.js';

class PetsController {
    async createPet(req, res) {
        try {
            const data = req.body;

            const { specId } = data;
            const spec = await Specs.findOne({ id: specId });
            const petSchema = new Pets({ ...data, spec });
            await petSchema.save();

            return res.json({ message: 'Питомец добавлен' });
        } catch (error) {
            console.log(`error `, error);
            res.send({ message: 'server error' });
        }
    }

    async getPets(req, res) {
        try {
            const { limit, pageNumber, allData, query } = req.query;
            const total = await Pets.countDocuments();

            if (query) {
                const skip = (+pageNumber - 1) * +limit;
                const pets = await Pets.find({
                    name: {
                        $regex: query,
                        $options: 'i',
                    },
                })
                    .limit(+limit)
                    .skip(skip);
                const totalSearched = await Pets.countDocuments({
                    name: {
                        $regex: query,
                        $options: 'i',
                    },
                });

                return res.json({ pets, total: totalSearched });
            }

            if (!+allData) {
                const skip = (+pageNumber - 1) * +limit;

                const pets = await Pets.find({}).limit(+limit).skip(skip);

                return res.json({ pets, total });
            } else {
                const pets = await Pets.find({});

                return res.json({ pets, total });
            }
        } catch (error) {
            console.log(`error `, error);
            res.send({ message: 'server error' });
        }
    }

    async deletePet(req, res) {
        try {
            const { id } = req.body;

            await Pets.findByIdAndDelete(id);

            res.send({ status: 'ok' });
        } catch (error) {
            console.log(`error `, error);
            res.send({ message: 'server error', error, status: 'error' });
        }
    }
}

export default new PetsController();
