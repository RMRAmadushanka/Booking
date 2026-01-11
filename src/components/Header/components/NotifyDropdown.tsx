"use client";

import { Popover, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import Avatar from "@/shared/Avatar";
import { BellIcon } from "@heroicons/react/24/outline";
// Avatar images - using placeholder URLs for now
// Replace with actual image imports when available
const avatar4 = "https://ui-avatars.com/api/?name=Eden+Tuan&background=667eea&color=fff";
const avatar5 = "https://ui-avatars.com/api/?name=Leo+Messi&background=764ba2&color=fff";
const avatar6 = "https://ui-avatars.com/api/?name=Leo+Kante&background=f093fb&color=fff";

const notifications = [
  {
    name: "Eden Tuan",
    description: "Measure actions your users take",
    time: "3 minutes ago",
    href: "##",
    avatar: avatar4,
  },
  {
    name: "Leo Messi",
    description: "Create your own targeted content",
    time: "1 minute ago",
    href: "##",
    avatar: avatar5,
  },
  {
    name: "Leo Kante",
    description: "Keep track of your growth",
    time: "3 minutes ago",
    href: "##",
    avatar: avatar6,
  },
];

interface Props {
  className?: string;
}

const NotifyDropdown: FC<Props> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<(() => void) | null>(null);
  const isOpenRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        closeRef.current &&
        isOpenRef.current
      ) {
        closeRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className={`relative flex ${className}`}>
        <Popover>
          {({ open, close }) => {
            // Store close function and open state in refs
            closeRef.current = close;
            isOpenRef.current = open;

            // Close handler
            const handleClose = () => {
              close();
            };

            return (
              <>
                <Popover.Button
                  className={` ${
                    open ? "" : "text-opacity-90"
                  } group self-center w-10 h-10 sm:w-12 sm:h-12 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center justify-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
                >
                  <span className="w-2 h-2 bg-blue-500 absolute top-2 right-2 rounded-full"></span>
                  <BellIcon className="h-6 w-6" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 w-screen max-w-xs sm:max-w-sm px-4 top-full -right-28 sm:right-0 sm:px-0">
                    <div className="overflow-hidden rounded-[var(--radius-lg)] shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7">
                        <h3 className="text-xl font-semibold">Notifications</h3>
                        {notifications.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-[var(--radius)] hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative"
                            onClick={handleClose}
                          >
                            <Avatar
                              imgUrl={item.avatar}
                              sizeClass="w-8 h-8 sm:w-12 sm:h-12"
                            />
                            <div className="ml-3 sm:ml-4 space-y-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                {item.name}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                {item.description}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-400">
                                {item.time}
                              </p>
                            </div>
                            <span className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            );
          }}
        </Popover>
      </div>
    </>
  );
};

export default NotifyDropdown;
