import Network from '../Network/Network';

export type NetworkPromiseResponse<T> = Promise<T>;

function getCreature<T>(creatureID: number): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    Network.unAuthorizedRequest(
      `/getCreature.php?creatureID=${creatureID}`,
      'GET',
    )
      .then(res => {
        resolve(res as any);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function searchCreature<T>(nameSearch: string): NetworkPromiseResponse<T> {
  return new Promise((resolve, reject) => {
    Network.unAuthorizedRequest(
      `/searchCreature.php?nameSearch=${nameSearch}`,
      'GET',
    )
      .then(res => {
        resolve(res as any);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default {
  getCreature,
  searchCreature,
};
