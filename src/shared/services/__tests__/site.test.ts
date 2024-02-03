import { Site } from '$/shared/services/site';
import { SITES_STATUS } from '$/shared/sites';

describe('Site', () => {
  describe('save', () => {
    it.only('should remove parent objects with children having montant and annee equal to 0', () => {
      const values = {
        nom: 'site 1',
        adresse: 'some adress',
        reference: 12345,
        status: SITES_STATUS,
      };

      const savedValues = Site.save(values);

      expect(savedValues).toEqual({
        nom: 'Site 1',
      });
    });

    it('should not modify original values object', () => {
      const values = {
        nom: 'Site 1',
      };

      Site.save(values);

      expect(values).toEqual({
        nom: 'Site 1',
      });
    });
  });
});
