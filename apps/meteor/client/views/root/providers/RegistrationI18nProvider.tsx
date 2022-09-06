import { useAbsoluteUrl, useLanguage } from '@rocket.chat/ui-contexts';
import i18next from 'i18next';
import i18nextHttpBackend from 'i18next-http-backend';
import React, { Suspense, memo, ReactElement, useEffect, useState } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import PageLoading from '../PageLoading';

const useI18n = (fallbackLng = 'en', namespace: string, defaultNamespace?: string): typeof i18next => {
	const basePath = useAbsoluteUrl()('/i18n');

	const i18n = useState(() => {
		const i18n = i18next.createInstance().use(i18nextHttpBackend).use(initReactI18next);

		i18n.init({
			fallbackLng,
			ns: [namespace],
			defaultNS: defaultNamespace || namespace,
			debug: true,
			backend: {
				loadPath: `${basePath}/{{lng}}.json`,
				parse: (data: string, _languages?: string | string[], namespaces: string | string[] = []): { [key: string]: any } => {
					const source = JSON.parse(data);
					const result: { [key: string]: any } = {};

					for (const key of Object.keys(source)) {
						const prefix = (Array.isArray(namespaces) ? namespaces : [namespaces]).find((namespace) => key.startsWith(`${namespace}.`));

						if (prefix) {
							result[key] = source[key];
						}
					}

					return result;
				},
			},
		});

		return i18n;
	})[0];

	const lng = useLanguage();

	useEffect(() => {
		i18n.changeLanguage(lng);
	}, [i18n, lng]);

	return i18n;
};

const RegistrationI18nProvider = ({ children }: { children: ReactElement }): ReactElement => {
	const i18n = useI18n('en', 'registration');

	return (
		<Suspense fallback={<PageLoading />}>
			<I18nextProvider i18n={i18n}>{children}</I18nextProvider>
		</Suspense>
	);
};

export default memo(RegistrationI18nProvider);
