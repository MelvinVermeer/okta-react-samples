export type OrganizationsResponse = {
  records: {
    commercialName: string;
  }[];
};

export const searchOrganizations = async (
  bearer: string,
  organizationIds: string[]
): Promise<OrganizationsResponse> => {
  const response = await fetch(
    "https://api.staging.floriday.io/apps-portal/organization/organizations/search",
    {
      body: JSON.stringify({
        includeExpired: false,
        page: 1,
        pageSize: 10,
        organizationIds,
      }),
      headers: {
        Authorization: `Bearer ${bearer}`,
        "Content-Type": "application/json",
        "X-Selected-Organization-Id": organizationIds[0],
      },
      method: "POST",
    }
  );
  return response.json();
};
