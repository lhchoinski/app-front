import React, { useEffect, useState } from 'react';
import { Link, matchPath, useLocation, useParams } from 'react-router-dom';
import { IBreadcrumbItem, IBreadcrumbsProps } from './interfaces';
import { DynamicIcons } from '@/components/DynamicIcons';

const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ items }) => {
    const [itemList, setItemList] = useState<IBreadcrumbItem[]>([]);
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        if (items) {
            setItemList(items);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, location, params]);

    return (
        <div className="mb-5">
            <ul className="flex text-gray-500 font-semibold dark:text-white-dark">
                {itemList.map((item, index) => (
                    <li
                        key={index}
                        className={
                            index > 0
                                ? "before:content-['/'] before:px-1.5 flex"
                                : 'flex items-center'
                        }
                    >
                        {item.uri && !matchPath(item.uri, location.pathname) ? (
                            <Link
                                to={item.uri}
                                className="text-primary hover:underline flex items-center"
                            >
                                {item.icon && (
                                    <DynamicIcons
                                        name={item.icon}
                                        className="mr-2"
                                    />
                                )}
                                {item.label}
                            </Link>
                        ) : (
                            <span className="flex items-center">
                                {item.icon && (
                                    <DynamicIcons
                                        name={item.icon}
                                        className="mr-2"
                                    />
                                )}
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
