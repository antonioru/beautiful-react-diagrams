import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { entityById } from '../../state/entities';

// todo: document this
const useEntityRegistration = (entityRef, id) => {
  const registerEntity = useSetRecoilState(entityById(id));

  useEffect(() => {
    if (entityRef.current) {
      registerEntity(entityRef.current);
    }

    return () => {
      registerEntity(null);
    };
  }, [entityRef, registerEntity]);
};

export default useEntityRegistration;
