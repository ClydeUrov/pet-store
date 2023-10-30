import Loader from '../../components/Loader/Loader';
import { Suspense, useState } from 'react';
import css from './AdminPage.module.scss';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../../icons/logo';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import { useSelector } from 'react-redux';


const AdminPage = () => {
    const [activeItem, setActiveItem] = useState({ href: 'account', text: 'My profile' });
    const [isContentListOpen, setIsContentListOpen] = useState(false);

    const navItems = [
        { href: 'orders', text: 'Orders' },
        { href: 'content', text: 'Content' },
        { href: 'users', text: 'Users' },
        { href: 'account', text: 'My profile' },
    ];

    const contentItems = [
        { href: 'products', text: 'Products' },
        { href: 'categories', text: 'Categories' },
        { href: 'brands', text: 'Brands' },
        { href: 'materials', text: 'Materials' },
        { href: 'colors', text: 'Colors' },
        { href: 'weights', text: 'Weights' },
        { href: 'sizes', text: 'Sizes' },
        { href: 'prescriptions', text: 'Prescriptions' },
        { href: 'constants', text: 'Constants' },
    ]

    return (
        <div className={css.container}>
            <div>
                <NavLink to="/" className={css.logo}>
                    <Logo />
                </NavLink>
                <div className={css.list}>
                    {navItems.map(({ href, text }) => (
                        <div key={href}>
                            {href === 'content' ? (
                                <div
                                    className={href === activeItem.href ? `${css.activeItem} ${css.content}` : `${css.content}`}
                                    onClick={() => {
                                        setActiveItem({ href, text });
                                    }}
                                >
                                    <div onClick={() => { setIsContentListOpen((prevIsContentListOpen) => !prevIsContentListOpen); }}>
                                        <p>{text}</p>
                                        <span>
                                            {isContentListOpen ? <AiOutlineDown /> : <AiOutlineRight />}
                                        </span>
                                    </div>
                                    {isContentListOpen && (
                                        <ul className={css.contentList}>
                                            {contentItems.map((contentItem) => (
                                                <li key={contentItem.href}>
                                                    <NavLink to={contentItem.href}>
                                                        {contentItem.text}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <NavLink
                                    className={href === activeItem.href ? css.activeItem : ''}
                                    to={href}
                                    onClick={() => setActiveItem({ href, text })}
                                >
                                    <p>{text}</p>
                                </NavLink>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}

export default AdminPage;