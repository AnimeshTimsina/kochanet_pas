import React from "react";
import { View, VirtualizedList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { useRouter } from "expo-router";

import AddNewAssessment from "~/components/assessment/addNewButton";
import AssessmentCard from "~/components/assessment/assessmentCard";
import { ArrowRightIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { EmptyData } from "~/components/ui/emptyData";
import Spinner from "~/components/ui/spinner";
import { Text } from "~/components/ui/text";
import TopHeader from "~/components/ui/userHeader";
import { api } from "~/utils/api";
import { useUser } from "~/utils/auth";

const Assessments = () => {
  const user = useUser();
  const NUMBER_OF_ASSESSMENTS = 3;
  // const router = useRouter();

  const { data, isLoading, refetch, isRefetching } =
    api.assessment.all.useQuery(
      { take: NUMBER_OF_ASSESSMENTS },
      { enabled: !!user?.id },
    );
  const showSeeMore = data?.count && data.count > NUMBER_OF_ASSESSMENTS;
  return (
    <SafeAreaView>
      <View className="flex h-full w-screen flex-col gap-6 px-4 py-4">
        <TopHeader />
        <View className="flex flex-1 flex-col gap-2">
          <View className="flex flex-row items-center justify-between gap-2">
            <Text className="font-fbold text-2xl">Recent assessments</Text>
            {showSeeMore ? (
              <Button variant={"link"} size="sm" className="-mb-1">
                <View>
                  <Text className="block text-primary">See more</Text>
                </View>
                <ArrowRightIcon size={16} />
              </Button>
            ) : (
              <></>
            )}
          </View>
          {isLoading ? (
            <View className="flex flex-row items-center gap-2 py-4">
              <Spinner size={20} />
              <Text>Loading...</Text>
            </View>
          ) : !data?.assessments.length ? (
            <EmptyData message="No assessments found" refetch={refetch} />
          ) : (
            <View className="flex w-full flex-1 flex-col gap-3">
              <VirtualizedList
                className="flex-1"
                renderItem={({ item: _item }) => {
                  const item = _item as (typeof data.assessments)[number];
                  return <AssessmentCard assessment={item} />;
                }}
                getItemCount={() => data.assessments.length}
                getItem={(__, index) => data.assessments[index]}
                data={data.assessments}
                ItemSeparatorComponent={() => <View className="my-2" />}
                keyExtractor={(item) =>
                  (item as (typeof data.assessments)[number]).id
                }
                onRefresh={refetch}
                refreshing={isRefetching}
              />
              <AddNewAssessment />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Assessments;
