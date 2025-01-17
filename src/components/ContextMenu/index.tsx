import React from 'react';
import { Group, Menu, UnstyledButton } from '@mantine/core';
import { DynamicIcons } from '@/components/DynamicIcons';
import { IContextMenuProps } from './interfaces';
import { Link } from 'react-router-dom';

const ContextMenu = <T,>({ data, buttons }: IContextMenuProps<T>) => {
    const buttonList = typeof buttons === 'function' ? buttons(data) : buttons;

    return (
        <>
            <Menu shadow="sm" position="left-start" withArrow>
                <Menu.Target>
                    <UnstyledButton>
                        <Group>
                            <DynamicIcons
                                name={'SlOptions'}
                                className="w-3 h-3 opacity-70"
                            />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    {buttonList.map((button, i) => {
                        if (button.onClick) {
                            return (
                                <Menu.Item
                                    key={i}
                                    leftSection={
                                        <DynamicIcons name={button.icon} />
                                    }
                                    color={button.color}
                                    onClick={() => {
                                        if (button.onClick) {
                                            button.onClick(data);
                                        }
                                    }}
                                    style={{
                                        padding: '4px 8px',
                                        fontSize: '14px',
                                    }}
                                >
                                    {button.text}
                                </Menu.Item>
                            );
                        }

                        if (button.to) {
                            return (
                                <Menu.Item
                                    key={i}
                                    leftSection={
                                        <DynamicIcons name={button.icon} />
                                    }
                                    color={button.color}
                                    component={Link}
                                    to={button.to}
                                    style={{
                                        padding: '4px 8px',
                                        fontSize: '14px',
                                    }}
                                >
                                    {button.text}
                                </Menu.Item>
                            );
                        }

                        return <></>;
                    })}
                </Menu.Dropdown>
            </Menu>
        </>
    );
};

export default ContextMenu;
