import { Injectable } from "@angular/core";
import {
  CronJobsConfig,
  CronJobsSelectOption,
  CronJobsValidationConfig,
  OptionType,
} from "../contracts/contracts";

@Injectable()
export class DataService {
  private defaultConfig: CronJobsConfig = {
    quartz: false,
    bootstrap: true,
    multiple: false,
  };

  private defaultValidateConfig: CronJobsValidationConfig = {
    validate: false,
  };

  private daysBase: Array<CronJobsSelectOption> = [
    { value: 0, label: "Dimanche" },
    { value: 1, label: "Lundi" },
    { value: 2, label: "Mardi" },
    { value: 3, label: "Mercredi" },
    { value: 4, label: "Jeudi" },
    { value: 5, label: "Vendredi" },
    { value: 6, label: "Samedi" },
  ];

  private daysOfWeekPosix: Array<CronJobsSelectOption> = [...this.daysBase];

  private daysOfWeekQuartz: Array<CronJobsSelectOption> = [
    ...this.daysBase.map((day, i) => ({
      ...day,
      value: i + 1,
    })),
  ];

  private numeral: Array<CronJobsSelectOption> = [
    ...new Array(31).fill(0).map((_, index) => {
      const value = index + 1;
      let suffix = "eme";
      if (value <= 10 || value >= 20) {
        switch (value) {
          case 1:
            suffix = "er";
            break;
        }
      }
      return {
        value,
        label: `${value}${suffix}`,
      };
    }),
  ];

  private _months: Array<CronJobsSelectOption> = [
    { value: 1, label: "Janvier" },
    { value: 2, label: "Février" },
    { value: 3, label: "Mars" },
    { value: 4, label: "Avril" },
    { value: 5, label: "Mai" },
    { value: 6, label: "Juin" },
    { value: 7, label: "Juillet" },
    { value: 8, label: "Août" },
    { value: 9, label: "Septembre" },
    { value: 10, label: "Octobre" },
    { value: 11, label: "Novembre" },
    { value: 12, label: "Décembre" },
  ];

  private _baseFrequency: Array<CronJobsSelectOption> = [
    { value: 0, label: "Séléctionner" },
    { value: 1, type: OptionType.minute, label: "Minute" },
    { value: 2, type: OptionType.hour, label: "Heure" },
    { value: 3, type: OptionType.day, label: "Jour" },
    { value: 4, type: OptionType.week, label: "Semaine" },
    { value: 5, type: OptionType.month, label: "Mois" },
    { value: 6, type: OptionType.year, label: "Année" },
  ];

  private _hours: Array<CronJobsSelectOption>;
  private _minutes: Array<CronJobsSelectOption>;

  public get baseFrequency(): Array<CronJobsSelectOption> {
    return [...this._baseFrequency];
  }

  public get daysOfMonth(): Array<CronJobsSelectOption> {
    return [...this.numeral];
  }

  public get months(): Array<CronJobsSelectOption> {
    return [...this._months];
  }

  public get hours(): Array<CronJobsSelectOption> {
    return [...this._hours];
  }

  public get minutes(): Array<CronJobsSelectOption> {
    return [...this._minutes];
  }

  constructor() {
    this._hours = [];
    for (let x = 0; x < 24; x++) {
      this._hours.push(<CronJobsSelectOption>{ value: x, label: `${x}` });
    }

    this._minutes = [];
    for (let x = 0; x < 60; x = x + 5) {
      this._minutes.push(<CronJobsSelectOption>{ value: x, label: `${x}` });
    }
  }

  getConfig(config: CronJobsConfig = {}): CronJobsConfig {
    return {
      ...this.defaultConfig,
      ...config,
    };
  }

  getValidate(
    validateConfig: CronJobsValidationConfig = {},
  ): CronJobsValidationConfig {
    return {
      ...this.defaultValidateConfig,
      ...validateConfig,
    };
  }

  getDaysOfWeek(quartz: Boolean = false): Array<CronJobsSelectOption> {
    if (quartz) {
      return [...this.daysOfWeekQuartz];
    }
    return [...this.daysOfWeekPosix];
  }
}
