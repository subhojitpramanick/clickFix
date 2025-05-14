import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ServiceCard = ({ service }) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="h-40 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x250?text=${service.name}`;
          }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-medium text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-primary-600 font-bold">Starting at ${service.basePrice}</div>
          <Link 
            to={`/repairs/${service.id}`}
            className="text-primary-600 hover:text-primary-800 flex items-center"
          >
            Details <FiArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 