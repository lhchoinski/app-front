import { FieldValues, FormProvider } from 'react-hook-form';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import React, { Fragment } from 'react';
import { DynamicIcons } from '@/components/DynamicIcons';
import { ICoreFormTabsProps } from './interfaces';
import SubmitButton from '@/components/Form/Buttons/Submit';
import { useTranslation } from 'react-i18next';
import { isCoreFormTab } from '@/helpers/CoreFormErrorsHelper';

const CoreFormTabs = <T extends FieldValues>({
                                                 tabs,
                                                 nonFormTabs = [],
                                                 onSubmit,
                                                 genericError,
                                                 formMethods,
                                                 hideSubmitButton = false,
                                             }: ICoreFormTabsProps<T>): JSX.Element => {
    const { t } = useTranslation();

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = formMethods;

    return (
        <div className="panel">
            <TabGroup>
                <TabList className="flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                    {[...tabs, ...nonFormTabs]
                        .filter(t => t.visible !== false)
                        .map((tab, index) => (
                            <Tab as={Fragment} key={index}>
                                {({ selected }) => (
                                    <button
                                        className={`
                                            ${selected ? ' text-primary !border-white-light !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                            ${isCoreFormTab(tab) && tab.ref && errors[tab.ref] ? 'text-red-500 hover:text-red-800' : 'hover:text-primary'}
                                            dark:border-[#191e3a]' -mb-[1px] flex items-center border border-transparent p-3.5 py-2
                                        `}
                                    >
                                        <DynamicIcons
                                            name={tab.icon}
                                            className="ltr:mr-2 rtl:ml-2"
                                        />
                                        {tab.name}
                                    </button>
                                )}
                            </Tab>
                        ))}
                </TabList>

                <TabPanels className="flex-1 border border-t-0 border-white-light p-4 text-sm dark:border-[#191e3a]">
                    <FormProvider {...formMethods}>
                        <form
                            onSubmit={handleSubmit(data =>
                                onSubmit(data, formMethods.reset),
                            )}
                            className="space-y-5"
                        >
                            {tabs
                                .filter(t => t.visible !== false)
                                .map((tab, index) => (
                                    <TabPanel unmount={false} key={index}>
                                        {tab.content(index)}

                                        <div className="mt-5">
                                            {genericError && (
                                                <div className="flex items-center p-3.5 rounded text-warning bg-warning-light dark:bg-warning-dark-light mb-5">
                                                    <span className="ltr:pr-2 rtl:pl-2">
                                                        <strong className="ltr:mr-1 rtl:ml-1">
                                                            {t('attention')}!
                                                        </strong>
                                                        {genericError}
                                                    </span>
                                                </div>
                                            )}

                                            {!hideSubmitButton ? (
                                                <div className="flex justify-end">
                                                    <SubmitButton
                                                        loading={isSubmitting}
                                                    />
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </TabPanel>
                                ))}
                        </form>
                    </FormProvider>

                    {nonFormTabs
                        .filter(t => t.visible !== false)
                        .map((tab, index) => (
                            <TabPanel key={index} unmount={false}>
                                {tab.content(index)}
                            </TabPanel>
                        ))}
                </TabPanels>
            </TabGroup>
        </div>
    );
};

export default CoreFormTabs;
