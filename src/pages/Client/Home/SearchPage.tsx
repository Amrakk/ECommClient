import useSearchQuery from '@/hooks/Client/home/useSearch';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
    const searchQuery = useSearchQuery();

    return (
        <div>
            Search Page
        </div>
    )
}

export default SearchPage