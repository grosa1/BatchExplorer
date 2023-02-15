import {
    AbstractEnvironment,
    Environment,
    EnvironmentConfig,
    EnvironmentName,
    getEnvironment,
} from "@batch/ui-common/lib/environment";
import {
    FormValues,
    Parameter,
    ParameterName,
} from "@batch/ui-common/lib/form";
import { FormControlOptions, FormControlResolver } from "../components/form";
import {
    FormLayout,
    FormLayoutProvider,
    FormLayoutType,
} from "../components/form/form-layout";
import {
    BrowserDependencyFactories,
    BrowserDependencyName,
} from "./browser-dependencies";
import { initFluentIcons } from "./environment-util";
import { MockBrowserEnvironment } from "./mock-browser-environment";

export interface BrowserEnvironment
    extends Environment<BrowserEnvironmentConfig> {
    getFormControl<V extends FormValues, K extends ParameterName<V>>(
        param: Parameter<V, K>,
        opts?: FormControlOptions<V, K>
    ): JSX.Element;

    getFormLayout(layoutType?: FormLayoutType): FormLayout;
}

export interface BrowserEnvironmentConfig extends EnvironmentConfig {
    enableA11yTesting?: boolean;
}

/**
 * Environment for a browser-based application
 */
export class DefaultBrowserEnvironment
    extends AbstractEnvironment<
        BrowserEnvironmentConfig,
        BrowserDependencyFactories
    >
    implements BrowserEnvironment
{
    name = EnvironmentName.Browser;

    async beforeInit(): Promise<void> {
        initFluentIcons();
    }

    async beforeDestroy(): Promise<void> {
        // No-op
    }

    /**
     * Get the form control for a given parameter
     */
    getFormControl<V extends FormValues, K extends ParameterName<V>>(
        param: Parameter<V, K>,
        opts?: FormControlOptions<V, K>
    ): JSX.Element {
        const resolver = this.getInjectable<FormControlResolver>(
            BrowserDependencyName.FormControlResolver
        );
        if (!resolver) {
            throw new Error(
                "No parameter type resolver configured for the current environment"
            );
        }
        return resolver.getFormControl(param, opts);
    }

    /**
     * Get the form control for a given parameter
     */
    getFormLayout(layoutType: FormLayoutType = "list"): FormLayout {
        const provider = this.getInjectable<FormLayoutProvider>(
            BrowserDependencyName.FormLayoutProvider
        );
        if (!provider) {
            throw new Error(
                "No form layout provider configured for the current environment"
            );
        }
        return provider.getLayout(layoutType);
    }
}

/**
 * Gets the current global browser environment if one is initialized.
 * Throws an error if there is no environment, or if the current
 * environment is not a browser environment.
 */
export function getBrowserEnvironment(): BrowserEnvironment {
    const currentEnv = getEnvironment();
    if (!currentEnv) {
        throw new Error(
            "Unable to get environment: No environment has been initialized"
        );
    }
    if (
        currentEnv instanceof DefaultBrowserEnvironment ||
        currentEnv instanceof MockBrowserEnvironment
    ) {
        return currentEnv;
    }
    throw new Error(
        "Unable to get environment: The current environment is not a browser environment"
    );
}
