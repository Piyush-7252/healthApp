import { useEffect } from 'react';
import { API_URL } from 'src/api/constants';
import { showSnackbar } from 'src/lib/utils';
import useCRUD from './useCRUD';

const usePatientDetail = ({ patientId }) => {
  const [data, error, loading, getDetail, clearResponse] = useCRUD({
    id: `patient-detail-${patientId}`,
    url: `${API_URL.getPatients}/${patientId}`,
    type: 'read',
    subscribeSocket:true
  });

  useEffect(() => {
    if (patientId && !data) {
      getDetail();
    }
  }, [patientId]);

  useEffect(() => {
    if (error) {
      showSnackbar({ message: error, severity: 'error' });
      clearResponse(true);
    }
  }, [error, clearResponse]);
  return [data?.results, loading, getDetail, clearResponse];
};

export default usePatientDetail;
