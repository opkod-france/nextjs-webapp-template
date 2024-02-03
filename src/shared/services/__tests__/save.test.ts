import { AxiosResponse } from 'axios';
import { FormikValues } from 'formik';
import _ from 'lodash';

import api from '$/shared/services/api';
import ENDPOINTS from '$/shared/services/endpoints';

const getMock = jest.spyOn(_, 'get');

import save from '$/shared/services/save';

const postSpy = jest.spyOn(api, 'post');

describe('save', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call api.post with the correct parameters', async () => {
    const entity = 'exampleEntity';
    const values: FormikValues = {
      // Les valeurs du formulaire ici
    };

    const endpoint = '/example-endpoint';
    const formData = new FormData();
    const options = { headers: { 'Content-Type': 'multipart/form-data' } };
    const response: AxiosResponse = {
      // La réponse de l'API ici
    };

    // Mock de la fonction get de lodash
    getMock.mockReturnValue(endpoint);

    // Mock de la fonction convertToFormData du module partagé
    jest.mock('$/shared/services/utils', () => ({
      convertToFormData: jest.fn().mockReturnValue(formData),
    }));

    // Mock de la fonction post d'api
    postSpy.mockResolvedValueOnce(response);

    // Appel de la fonction save
    const savePromise = save(entity, values);

    // Vérification des appels de fonctions
    expect(getMock).toHaveBeenCalledWith(ENDPOINTS, entity);
    expect(postSpy).toHaveBeenCalledWith(endpoint, formData, options);

    // // Vérification de la valeur de retour
    await expect(savePromise).resolves.toBe(response);
  });
});
