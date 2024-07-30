import type {EntityId} from "@reduxjs/toolkit";
import {accessNames} from "../../accessControles/accessNames";

export const filtersPolicyNone = (dataRole: Record<string, string>) => {
  const filteredEntries = Object.entries(dataRole).filter(([key, value]) => !/\.none/.test(value));

  return Object.fromEntries(filteredEntries);
};

export const addNonePolicy = (item: any, allPolicy: EntityId[]) => {
  if (!item.policies.includes(accessNames.fullAccess)) {
    const policyNameItems = item.policies.map((policy: string) => policy.split('.')[0]);
    const policyNameSet = new Set<EntityId>(policyNameItems);
    const missingPolicies = allPolicy.filter((policyName: EntityId) => !policyNameSet.has(policyName))
        .map((policyName: EntityId) => `${policyName}.none`);
    item.policies = [...item.policies, ...missingPolicies];
  }

  return item;
};
